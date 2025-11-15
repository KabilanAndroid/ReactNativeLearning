import firestore from '@react-native-firebase/firestore';

const createTwoUserRoom = async (
  user1: { uid: any; displayName: any },
  user2: { uid: any; displayName: any },
) => {
  const { uid: uid1, displayName: displayName1 } = user1;
  const { uid: uid2, displayName: displayName2 } = user2;
  try {
    const roomRef = await firestore()
      .collection('chatRooms')
      .add({
        users: [
          { uid: uid1, displayName: displayName1 },
          { uid: uid2, displayName: displayName2 },
        ].sort((a, b) => a.uid.localeCompare(b.uid)),
      });
    console.log('Room created with ID: ', roomRef.id);
    return roomRef.id;
  } catch (error) {
    console.error('Error creating room: ', error);
    throw error;
  }
};

export default createTwoUserRoom;
