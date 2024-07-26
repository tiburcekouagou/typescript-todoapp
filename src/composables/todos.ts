import type { Todo } from "@/@types"
import { db } from "@/configs/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { ref } from "vue";

const firebaseTodos = ref<Todo[]>([]);

// fonction qui s'exécute à chaque fois que j'interagis avec la BDD
onSnapshot(collection(db, 'todos'), (snapShot) => {
    snapShot.docChanges().forEach((change) => {
        console.log("add")
        if (change.type === "added") {
            const todo = {
                id: change.doc.ref.id,
                title: change.doc.data().title,
                complete: change.doc.data().complete,
            }

            firebaseTodos.value.push(todo);
        } else if (change.type === "modified") {
            console.log("modified")
            const index = firebaseTodos.value.findIndex((todo) => todo.id === change.doc.ref.id);
            console.log(index);

            if (index !== -1) {
                firebaseTodos.value[index] = {
                    ...firebaseTodos.value[index],
                    title: change.doc.data().title,
                    complete: change.doc.data().complete,
                }
            }

        } else {
            firebaseTodos.value = firebaseTodos.value.filter((todo) => todo.id !== change.doc.ref.id)
        }
    })
})



export const useTodos = () => {

    // Récupération de tâches
    async function getTodos() {
        const querySnapshot = await getDocs(collection(db, "todos"));
        querySnapshot.forEach((doc) => {
            // on ajoute l'ensemble des tâches dans le tableau 
            const todo: Todo = {
                id: doc.ref.id,
                title: doc.data().title,
                complete: doc.data().complete
            }
            
            // firebaseTodos.value.push(todo) 
        });
    }

    async function getTodo(todo: Todo) {
        
        const docRef = doc(db, "todos", todo.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        }
    }

    // Creation de tâches
    async function createTodo(todoTitle: string) {
        try {
            await addDoc(collection(db, 'todos'), {
                title: todoTitle,
                complete: false,
                createdAt: serverTimestamp(),
                updatedAt: null,
            })
        } catch (error) {
            console.error(error);
        }   
    }
    
    // Modification de tâches
    async function changeTodo(todo: Todo, newTodo: Todo) {
        await updateDoc(doc(db, 'todos', todo.id), {
            title: newTodo.title,
            complete: newTodo.complete,
            updatedAt: serverTimestamp(),
        });
    }
    
    // Suppression de tâches
    async function removeTodo(todo: Todo) {
        await deleteDoc(doc(db, 'todos', todo.id));
    }


    return {
        firebaseTodos,
        getTodos,
        getTodo,
        createTodo,
        changeTodo,
        removeTodo,
    }
}