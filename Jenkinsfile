pipeline {
    agent any

    tools {
        // 설치된 Maven의 이름
        maven "maven"
    }

    stages {
        stage('Git Pull') {
            steps {
                // Get some code from a GitLab repository
                git credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s08-webmobile1-sub2/S08P12A405.git'

            }
        }
        stage('Build') {
            steps {
                sh "ls -a"
                dir('backend') { //gradle 권한 설정 후 gradle로 도커 이미지 빌드하는 명령어 실행 
                        sh "mvn -Dmaven.test.failure.ignore=true -f ./backend/bangbang/ clean package"
                        echo "fail build"
                        sh "docker stop spring"
                        sh "docker rm spring"
                        echo "container none"
                    } //8083 포트에서 spring이라는 이미지를 spring이라는 컨테이너이름으로 설정해서 실행
                    sh "docker run -d -p 3000:3000 --name spring spring "
                }
            }
        }
    }
}
