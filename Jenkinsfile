pipeline {
  agent any
  triggers {
    pollSCM('* * * * *') // cada minuto. Luego lo cambiamos a webhook.
  }
  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/e2ure/my-pub.git'
      }
    }
    stage('Build') {
      steps {
        echo 'Construyendo el proyecto...'
      }
    }
    stage('Tests') {
      steps {
        echo 'Ejecutando pruebas...'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Desplegando...'
      }
    }
  }
}
