pipeline {
  agent any
  stages {
    stage('Clonar Repo') {
      steps {
        checkout scm
      }
    }
    stage('Build') {
      steps {
        echo "Compilando..."
      }
    }
    stage('Test') {
      steps {
        echo "Ejecutando pruebas..."
      }
    }
    stage('Deploy') {
      steps {
        echo "Desplegando app..."
      }
    }
  }
}
