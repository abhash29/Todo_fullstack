import { atom, atomFamily, selector } from "recoil";
import  axios  from "axios";

export const todoAtom = atom({
    key: "todoAtom",
    default: [],
});

export const todoQuery = selector({
    key: "todoQuery",
    get: async() => {
        const res = await axios.get("http://localhost:3000/todos");
        return res.data;
    }
});

export const todoByIdQuery = selector({
    key: "todoByIdQuery",
    get: (id) => async () => {
        const res = await axios.get(`http://localhost:3000/todos/${id}`);
        return res.data;
    },
});