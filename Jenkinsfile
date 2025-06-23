pipeline {
  agent any

  environment {
    IMAGE_NAME = "my-pub-dev"
    CONTAINER_NAME = "my-pub-container"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME .'
      }
    }

    stage('Run Container') {
      steps {
        sh '''
          docker stop $CONTAINER_NAME || true
          docker rm $CONTAINER_NAME || true
          docker run -d --name $CONTAINER_NAME -p 3000:3000 $IMAGE_NAME
        '''
      }
    }
  }
}
