import React from "react";
import ItemDetailsClient from "./ItemDetailsClient";
import { HANDMADE_ITEMS, getItemById } from "../../../data/items";

export async function generateStaticParams() {
  return HANDMADE_ITEMS.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = getItemById(id) || HANDMADE_ITEMS[0];
  return {
    title: `${item.title} — Handmade Studio`,
    description: item.shortDescription || item.description,
  };
}

export default async function ItemDetailsPage({ params }) {
  const { id } = await params;
  const item = getItemById(id) || HANDMADE_ITEMS[0];

  return <ItemDetailsClient id={id} initialItem={item} />;
}
