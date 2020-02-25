### service configuration

* edit `/etc/systemd/system/florest.service`:

```
[Unit]
Description=Manage Java Florest service

[Service]
WorkingDirectory=<path_to_service_here>
ExecStart=java -Xms128m -Xmx256m -jar florest.jar
User=ec2-user
Type=simple
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

* reload system demon: `systemctl daemon-reload`
