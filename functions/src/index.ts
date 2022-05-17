import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// firebase_toolsをインポート
const firebase_tools = require('firebase-tools')

admin.initializeApp(functions.config().firebase)

export const onDeleteForSubCollection = functions
  .region('asia-northeast1')
  .firestore.document('menues/{docID}')
  .onDelete(async (snapshot, context) => {
    try {
      // 削除されたドキュメントのパスを取得
      const path = snapshot.ref.path

      await firebase_tools.firestore.delete(path, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        token: functions.config().fb.token,
        force: true,
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  })
