# Descriere backend

## Instructiuni de folosire

pentru rularea oricarui script python trebuie mai intai instalate toate librariile gasite in 'requirements.txt'
#
  serverul se foloseste de fisierul .env pentru a gasi cheile:
  - GOOGLE_GENAI_KEY (pentru a folosi api-ul google gemini)
  - JWT_SECRET_KEY (generare token la login pentru a verifica sesiunea)
  - DATABASE_PATH (absolute path pe disk unde va fi generata baza de date)

  serverul se porneste prin rularea scriptului **main.py**

#Structura:

## routes

Aici se afla toate rutele aplicatiei backend: login, register, etc

## google_genai

Pentru verificarea imaginilor folosim modelul google gemini
#
  scriptul **predict.py** face o cerere la api-ul google genai pentru a verifica imaginile

## services
#
  **check_image.py** genereaza predictia bazata pe optiunile date

#
  **user_service.py** initializeaza tabelele in baza de date


## ml:

scriptul predict.py printeaza, in ordine, rezultatul pentru fiecare poza din directorul 'test_photos'
modelul folosit este cel gasit in fisierul 'models'.
#### lista modele create de mine:
#
  model bazat pe resnet50 : [link download](https://www.kaggle.com/code/radughenea/waste-classifier/output?scriptVersionId=268544736)
- modelul arata 80% accuracy pe testele din dataset, dar rulat local eu primesc numai raspunsul "metal"
