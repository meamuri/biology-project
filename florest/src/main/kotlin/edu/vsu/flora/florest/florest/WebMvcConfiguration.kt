package edu.vsu.flora.florest.florest

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import edu.vsu.flora.florest.florest.security.JwtAuthenticationFilter
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ResourceLoader
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
class WebMvcConfiguration(
    @Qualifier("webApplicationContext") private val resourceLoader: ResourceLoader,
    private val jwtAuthenticationFilter: JwtAuthenticationFilter,
    private val configProperties: ConfigProperties,
    @Qualifier("principalDetailsService") private val userDetailsService: UserDetailsService
) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        http
            .authorizeRequests().antMatchers("/api/auth/**").permitAll()
            .and()
            .authorizeRequests().antMatchers(HttpMethod.GET, "/api/species/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .cors()
            .and()
            .csrf().disable()

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)
    }

    @Bean
    override fun authenticationManager(): AuthenticationManager = super.authenticationManager()

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder(7)

    override fun configure(auth: AuthenticationManagerBuilder) {
        val provider = DaoAuthenticationProvider().apply {
            this.setUserDetailsService(userDetailsService)
            this.setPasswordEncoder(passwordEncoder())
        }
        auth.authenticationProvider(provider)
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val cors = CorsConfiguration()
        cors.allowedOrigins = loadOrigins()
        cors.allowedMethods = listOf("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")

        cors.allowCredentials = true
        cors.maxAge = 30L

        cors.allowedHeaders = listOf("Authorization", "Cache-Control", "Content-Type")
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", cors)
        return source
    }

    fun loadOrigins(): List<String> {
        val path = configProperties.pathToAllowedOrigins
        val resource = resourceLoader.getResource("file:${path}")
        return jacksonObjectMapper().readValue(resource.url)
    }
}
