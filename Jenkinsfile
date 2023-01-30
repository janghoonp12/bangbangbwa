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
                git credentialsId: 'jenkins_deloy', url: 'http://[GitLab주소]/[그룹명]/[프로젝트명].git'

            }
        }
        stage('Build') {
            steps {
                // Run Maven on a Unix agent.
                sh "mvn -Dmaven.test.failure.ignore=true clean package"

            }
        }
    }
}