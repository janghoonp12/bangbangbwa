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

                dir(backend) {
                    sh "mvn -Dmaven.test.failure.ignore=true -f ./backend/bangbang/ clean package"
                }

            }
        }
    }
}
