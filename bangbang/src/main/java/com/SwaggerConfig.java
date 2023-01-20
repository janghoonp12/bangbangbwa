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
		
		Docket docket = new Docket(DocumentationType.SWAGGER_2);	//swagger 핵심 클래스
		ApiSelectorBuilder builder = docket.select();				//문서 작성을 위한 내부 초기화 작업
		
		//문서를 만들 대상 컨트롤러가 있는 패키지 지정
		builder = builder.apis(RequestHandlerSelectors.basePackage("com.mvc.controller"));
		
		//api()로 선택된 api중 특정 path조건에 맞는 api를 다시 필터링하여 문서화 작업을 함
		builder = builder.paths(PathSelectors.ant("/**"));
		//builder = builder.paths(regex("/customers/*.*"));
		
		docket = builder.build();
		
		docket = docket.apiInfo(apiInfo());
		return docket;
	}
	
	private ApiInfo apiInfo() {
		ApiInfoBuilder b = new ApiInfoBuilder();
		b = b.title("Customer API입니다.");
		b = b.description("<h3>Customer</h3>Swagger를 이용한 Customer API<br><img src=image/f2.jpg width=150>");
		b = b.version("3.0");
		ApiInfo ai = b.build();
		return ai;
	}
	
}
