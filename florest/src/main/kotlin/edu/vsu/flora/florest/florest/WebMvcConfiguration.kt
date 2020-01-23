package edu.vsu.flora.florest.florest

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
class WebMvcConfiguration : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        http
            .authorizeRequests().antMatchers("/**").permitAll()
            .anyRequest().permitAll() //.anyRequest().authorized()
            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .cors()
            .and()
            .csrf().disable()
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val cors = CorsConfiguration()
        cors.allowedOrigins = listOf("*")
        cors.allowedMethods = listOf("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")

        cors.allowCredentials = true
        cors.maxAge = 30L

        cors.allowedHeaders = listOf("Authorization", "Cache-Control", "Content-Type")
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", cors)
        return source
    }
}
