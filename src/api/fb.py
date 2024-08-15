from firebase_admin import credentials, initialize_app, storage
# Init firebase with your credentials

cred = credentials.Certificate("react-firebase-project")
initialize_app(cred, {'storageBucket': 'react-firebase-proyect.appspot.com'})

# Put your local file path 
fileName = "myImage.jpg"
bucket = storage.bucket()
blob = bucket.blob(fileName)
blob.upload_from_filename(fileName)

# Opt : if you want to make public access from the URL
blob.make_public()

print("your file url", blob.public_url)