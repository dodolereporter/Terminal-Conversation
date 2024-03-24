# Terminal Conversation

## Requirements

- Java 21
- PostgreSQL Server

## Images

![image](https://github.com/dodolereporter/Terminal-Conversation/assets/60071624/11503612-9309-4cff-b08b-907b7a553182)

![image](https://github.com/dodolereporter/Terminal-Conversation/assets/60071624/592d74f1-c49e-4347-bc5b-7c3287d57e50)

## Setup

### Configutration

Edit application.properties with your database credentials and jwt secret

```properties
spring.application.name=terminal
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/terminal
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=false
spring.jpa.properties.hibernate.use_sql_comments=true
spring.jpa.properties.hibernate.type=trace
spring.jpa.properties.hibernate.jdbc.time_zone=Europe/Paris
server.port=8080
```

#### Change default port

Edit this line in application.properties

```properties
server.port=<SERVER_PORT>
```

## Usages

#### Access To the terminal 
```http
http://localhost:8080/
```

#### Access To the panel 
```http
http://localhost:8080/panel
```

## Footer

### Author

[@dodolereporter](https://github.com/dodolereporter)

### License

[MIT](https://choosealicense.com/licenses/mit/)
