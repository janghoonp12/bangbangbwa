package com;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.ApiSelectorBuilder;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

//swagger: 컨트롤러에 명시된 어노테이션을 해석해서 api문서를 자동으로 생성해줌
//ver 2: localhost/swagger-ui.html
//ver 3: localhost/swagger-ui/index.html

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	
	@Bean
	public Docket makeDocket() {
		return new Docket(DocumentationType.SWAGGER_2)
				.groupName("bangbang")
				.apiInfo(apiInfo())
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.bangbang.controller"))
				.build();
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("Item API")
				.description("<h2>매물 API TEST</h2>")
				.version("1.0").build();
	}


}
