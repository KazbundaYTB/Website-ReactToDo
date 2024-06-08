import React, { useState, useEffect } from "react";
import "./style.css";
import QuestList from "./components/QuestList";
import NavBar from "./components/NavBar";
import Login from "./components/LoginScreen";
import QuestPopup from "./components/QuestPopup";
import SettingsPopup from "./components/SettingsPopup";
import { db } from "./api/firebaseConfig";
import { collection, query, where, getDocs, addDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [quests, setQuests] = useState([]);
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [ShowSettingsPopup, setShowSettingsPopup] = useState(false);
  const [parentWidth, setParentWidth] = useState('auto');

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Vždy nastavíme user, i když je null
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (user && user.uid) { // Kontrola, že user není null a má vlastnost uid
      const fetchQuests = async () => {
        const q = query(collection(db, "quests"), where("userId", "==", user.uid));
        try {
          const querySnapshot = await getDocs(q);
          const questsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setQuests(questsData);
        } catch (error) {
          console.error("Error fetching quests: ", error);
        }
      };
      fetchQuests();
    } else {
      setQuests([]); // Pokud user není přihlášen, vyprázdníme questy
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid) { // Kontrola, že user není null a má vlastnost uid
      const unsubscribe = onSnapshot(query(collection(db, "quests"), where("userId", "==", user.uid)), (snapshot) => {
        const questsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setQuests(questsData);
      });
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 650) {
        setParentWidth('410px');
      } else {
        setParentWidth('auto');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Voláme funkci po načtení stránky pro správnou inicializaci šířky

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addQuest = async (title, name, time) => {
    if (user && user.uid) { // Kontrola, že user není null a má vlastnost uid
      try {
        const newQuest = {
          title,
          name,
          time,
          userId: user.uid,
        };
        await addDoc(collection(db, "quests"), newQuest);
        setShowPopup(false); // Skryj popup po přidání questu
      } catch (error) {
        console.error("Error adding quest: ", error);
      }
    }
  };

  const handleSettingsClose = () =>{ setShowSettingsPopup(false)}
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!user) {
    return <Login setUser={setUser} />;
  }

  const deleteQuest = async (questId) => {
    if (user && user.uid) { // Kontrola, že user není null a má vlastnost uid
      try {
        await deleteDoc(doc(db, "quests", questId));
      } catch (error) {
        console.error("Error deleting quest: ", error);
      }
    }
  };

  const updateQuest = async (updatedQuest) => {
    if (user && user.uid) {
      try {
        const questDocRef = doc(db, "quests", updatedQuest.id);
        await updateDoc(questDocRef, {
          title: updatedQuest.title,
          name: updatedQuest.name,
          time: updatedQuest.time,
        });
        setQuests(prevQuests => 
          prevQuests.map(quest =>
            quest.id === updatedQuest.id ? updatedQuest : quest
          )
        );
      } catch (error) {
        console.error("Error updating quest: ", error);
      }
    }
  };

  const filteredQuests = quests.filter(quest =>
    quest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ width: parentWidth > 1000 ? 410 : parentWidth }}>
      <div className="w-screen h-screen bg-gray-700" style={{ width: parentWidth }}>
      {showPopup && <QuestPopup addQuest={addQuest} setShowPopup={setShowPopup} />}
      {ShowSettingsPopup && <SettingsPopup setShowPopup={setShowPopup} handleSettingsClose={handleSettingsClose} handleSignOut={handleSignOut} />}
        <div className="h-[5%] text-white flex justify-center items-center text-2xl">
          <h1>QUESTS:</h1>
        </div>
        <div className="h-[10%] text-black flex justify-center items-center text-2xl">
          <input
            type="search"
            placeholder="Search for your quest!"
            className="rounded placeholder-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="h-[65%] bg-gray-600 flex flex-col justify-center items-center text-2xl space-y-3 overflow-y-auto">
          <QuestList searchQuery={searchQuery} quests={filteredQuests} deleteQuest={deleteQuest} updateQuest={updateQuest} />
        </div>
        <div className="h-[10%] bg-gray-500 flex justify-center items-center text-2xl rounded-2xl">
          <NavBar setShowPopup={setShowPopup} setShowSettingsPopup={setShowSettingsPopup} handleSignOut={handleSignOut} questArrayLength={quests.length} />
        </div>
      </div>
    </div>
  );
}

export default App;
