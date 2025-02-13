import React, { useRef, useState } from "react";
import { OutlineCard } from "@/lib/types";

interface Props {
  outlines: OutlineCard[];
  addMultipleOutlines: (card: OutlineCard[]) => void;
  setEditText: (value: string) => void;
  editText: string;
  selectedCard: string | null;
  addOutline?: (card: OutlineCard) => void;
  onEditChange: (value: string) => void;
  onCardSelect: (id: string) => void;
  onCardDoubleClick: (id: string, title: string) => void;
  editingCard: string | null;
  setEditingCard: (id: string | null) => void;
  setSelectedCard: (id: string | null) => void;
}

const UseCardList = ({
  editingCard,
  editText,
  onCardSelect,
  selectedCard,
  setEditText,
  onEditChange,
  onCardDoubleClick,
  setEditingCard,
  addMultipleOutlines,
  outlines,
  addOutline,
  setSelectedCard,
}: Props) => {
  const [draggedItem, setDraggedItem] = useState<OutlineCard | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragOffsetY = useRef<number>(0);

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 2;

    if (y < threshold) {
      setDragOverIndex(index);
    } else {
      setDragOverIndex(index + 1);
    }
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || dragOverIndex === null) return;

    const updatedCards = [...outlines];
    const draggedIndex = updatedCards.findIndex(
      (card) => card.id === draggedItem.id,
    );

    if (draggedIndex === -1 || draggedIndex === dragOverIndex) return;

    const [removedCards] = updatedCards.splice(draggedIndex, 1);
    updatedCards.splice(
      dragOverIndex > draggedIndex ? dragOverIndex - 1 : dragOverIndex,
      0,
      removedCards,
    );
    addMultipleOutlines(
      updatedCards.map((card, index) => ({ ...card, order: index + 1 })),
    );
    setDraggedItem(null);
    setDragOverIndex(null);
  };
  const onCardUpdate = (id: string, newTitle: string) => {
    addMultipleOutlines(
      outlines.map((card) =>
        card.id === id ? { ...card, title: newTitle } : card,
      ),
    );
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");
  };
  const onCardDelete = (id: string) => {
    addMultipleOutlines(
      outlines
        .filter((card) => card.id !== id)
        .map((card, index) => ({ ...card, order: index + 1 })),
    );
  };
  const onDragStart = (e: React.DragEvent, card: OutlineCard) => {
    setDraggedItem(card);
    e.dataTransfer.effectAllowed = "move";

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragOffsetY.current = e.clientY - rect.top;

    const draggedEl = e.currentTarget.cloneNode(true) as HTMLElement;

    draggedEl.style.position = "absolute";
    draggedEl.style.top = "-1000px";
    draggedEl.style.opacity = "0.8";
    draggedEl.style.width = `${(e.currentTarget as HTMLElement).offsetWidth}px`;
    document.body.appendChild(draggedEl);
    e.dataTransfer.setDragImage(draggedEl, 0, dragOffsetY.current);

    setTimeout(() => {
      setDragOverIndex(outlines.findIndex((c) => c.id === card.id));
      document.body.removeChild(draggedEl);
    }, 0);
  };
  const onDragEnd = () => {
    setDragOverIndex(null);
    setDraggedItem(null);
  };
  const getDragOverStyles = (cardIndex: number) => {
    if (dragOverIndex === null || draggedItem === null) return {};
    if (cardIndex == dragOverIndex) {
      return {
        borderTop: "2px solid #000",
        marginTop: "0.5rem",
        transition: "margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
      };
    } else if (cardIndex == dragOverIndex - 1) {
      return {
        borderBottom: "2px solid #000",
        marginBottom: "0.5rem",
        transition: "margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
      };
    }
    return {};
  };

  const onAddCard = (index?: number) => {
    const newCard: OutlineCard = {
      id: Math.random().toString(36).substring(2, 9),
      title: editText || "New Section",
      order: (index !== undefined ? index + 1 : outlines.length) + 1,
    };
    const updatedCards =
      index !== undefined
        ? [
            ...outlines.slice(0, index + 1),
            newCard,
            ...outlines
              .slice(index + 1)
              .map((card) => ({ ...card, order: card.order + 1 })),
          ]
        : [...outlines, newCard];
    addMultipleOutlines(updatedCards);
    setEditText("");
  };
  return {
    onDragOver,
    onDrop,
    onCardUpdate,
    onCardDelete,
    onDragStart,
    onDragEnd,
    getDragOverStyles,
    editingCard,
    editText,
    onCardSelect,
    selectedCard,
    setEditText,
    onEditChange,
    onCardDoubleClick,
    setEditingCard,
    addMultipleOutlines,
    outlines,
    addOutline,
    setSelectedCard,
    draggedItem,
    setDraggedItem,
    dragOverIndex,
    setDragOverIndex,
    dragOffsetY,
  };
};
export default UseCardList;
