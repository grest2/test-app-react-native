import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppState} from "../redux/reducers";
import {AppDispatch} from "../redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector