package com.bangbang.config;

import java.util.Arrays;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.ApiSelectorBuilder;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2

public class SwaggerConfig {
  @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2)
        .securityContexts(Arrays.asList(securityContext()))
        .securitySchemes(Arrays.asList(apiKey()))
        .select()
        .apis(RequestHandlerSelectors.basePackage("com.bangbang.controller"))
        .paths(PathSelectors.any())
        .build()
        ;
  }

  private SecurityContext securityContext() {
    return SecurityContext.builder()
        .securityReferences(defaultAuth())
        .build();
  }

  private List<SecurityReference> defaultAuth() {
    AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
    AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
    authorizationScopes[0] = authorizationScope;
    return Arrays.asList(new SecurityReference("Authorization ", authorizationScopes));
  }

  private ApiKey apiKey() {
    return new ApiKey("Authorization ", "X-AUTH-TOKEN", "header");
  }
//  @Bean
//  public Docket makeDocket() {
//
//    Docket docket = new Docket(DocumentationType.SWAGGER_2);	//swagger 핵심 클래스
//    ApiSelectorBuilder builder = docket.select();				//문서 작성을 위한 내부 초기화 작업
//
//    //문서를 만들 대상 컨트롤러가 있는 패키지 지정
//    builder = builder.apis(RequestHandlerSelectors.basePackage("com.bangbang.controller"));
//
//    //api()로 선택된 api중 특정 path조건에 맞는 api를 다시 필터링하여 문서화 작업을 함
//    builder = builder.paths(PathSelectors.ant("/**"));
//    //builder = builder.paths(regex("/customers/*.*"));
//
//    docket = builder.build();
//
//    docket = docket.apiInfo(apiInfo());
//    return docket;
//  }
//
//  private ApiInfo apiInfo() {
//    ApiInfoBuilder b = new ApiInfoBuilder();
//    b = b.title("BangBang API입니다.");
//    b = b.description("<h3>BangBang</h3>Swagger를 이용한 Customer API<br><img src=image/f2.jpg width=150>");
//    b = b.version("3.0");
//    ApiInfo ai = b.build();
//    return ai;
//  }

}
