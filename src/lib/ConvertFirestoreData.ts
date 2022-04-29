import {
  FirestoreDataConverter,
  WithFieldValue,
  QueryDocumentSnapshot,
} from 'firebase/firestore'

const ConvertFirestoreData = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot<T>) => {
    const data = snapshot.data()
    Object.keys(data).forEach((key) => {
      if (
        typeof data[key].toString == 'function' &&
        data[key].toString().startsWith('Timestamp')
      ) {
        // firestoreのtimestamp型は扱いにくいのでdate型に変更させる
        data[key] = data[key].toDate()
      }
    })

    return data
  },
})

export default ConvertFirestoreData
