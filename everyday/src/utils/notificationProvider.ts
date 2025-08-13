import type { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import {toast, type ToastContentProps} from "react-toastify";

export const onNotify = (msg: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | ((props: ToastContentProps<unknown>) => ReactNode) | null | undefined) => {
  toast(msg);
}