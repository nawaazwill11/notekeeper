# Entry point for the application.
from . import app    # For application discovery by the 'flask' command.
from . import views  # For import side-effects of setting up routes.

# import firebase_admin
# from firebase_admin import credentials
# from firebase_admin import firestore

# # Use the application default credentials
# cred = credentials.ApplicationDefault()
# firebase_admin.initialize_app(cred, {
#   'projectId': "book-269406",
# })

# db = firestore.client()
# users_ref = db.collection(u'users')
# docs = users_ref.stream()

# for doc in docs:
#     print(u'{} => {}'.format(doc.id, doc.to_dict()))
