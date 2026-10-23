import { redirect } from "next/navigation";

export default function AddProductRedirect() {
  redirect("/items/add");
}
