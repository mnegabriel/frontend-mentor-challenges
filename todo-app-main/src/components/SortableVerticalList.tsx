import { createSignal, For, JSX, mergeProps } from "solid-js"
import { useDragDropContext } from "@thisbeyond/solid-dnd"
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  closestCenter,
} from "@thisbeyond/solid-dnd"

type SortableProps<TItem> = {
  item: TItem
  idLabel?: string
  itemComponent: (item: TItem) => JSX.Element
}

const Sortable = <T extends Record<string, any>>(props: SortableProps<T>) => {
  const mergedProps = mergeProps({ idLabel: "id" }, props)

  const sortable = createSortable(mergedProps.item[mergedProps.idLabel])
  const [state] = useDragDropContext()!

  return (
    <div
      use:sortable
      class="sortable"
      style="touch-action:none;"
      classList={{
        "opacity-25": sortable.isActiveDraggable,
        "transition-transform": !!state.active.draggable,
      }}
    >
      {mergedProps.itemComponent(mergedProps.item)}
    </div>
  )
}

type SortableListProps<TItem> = {
  class?: string
  overlayClass?: string
  items: TItem[]
  idLabel?: string
  onDragEnd: (event: { fromIndex: number; toIndex: number }) => void
  itemComponent: (item: TItem) => JSX.Element
}

export const SortableVerticalList = <T extends Record<string, any>>(
  props: SortableListProps<T>,
) => {
  const mergedProps = mergeProps({ idLabel: "id" }, props)

  const [activeItem, setActiveItem] = createSignal<T | null>(null)
  const ids = () => mergedProps.items.map((i) => i[mergedProps.idLabel])

  // @ts-ignore
  const onDragStart = ({ draggable }) => {
    const selectedItem = mergedProps.items.find(
      (i) => i[mergedProps.idLabel] === draggable.id,
    )
    selectedItem && setActiveItem(() => selectedItem)
  }

  // @ts-ignore
  const onDragEnd = ({ draggable, droppable }) => {
    setActiveItem(null)
    if (draggable && droppable) {
      const currentItems = ids()
      const fromIndex = currentItems.indexOf(draggable.id)
      const toIndex = currentItems.indexOf(droppable.id)

      if (fromIndex !== toIndex) {
        mergedProps.onDragEnd({ fromIndex, toIndex })
      }
    }
  }

  return (
    <DragDropProvider
      onDragStart={onDragStart}
      // @ts-ignore
      onDragEnd={onDragEnd}
      collisionDetector={closestCenter}
    >
      <DragDropSensors />

      <div class={mergedProps.class}>
        <SortableProvider ids={ids()}>
          <For each={mergedProps.items}>
            {(item) => (
              <Sortable
                item={item}
                itemComponent={mergedProps.itemComponent}
                idLabel={mergedProps.idLabel}
              />
            )}
          </For>
        </SortableProvider>
      </div>

      <DragOverlay class={mergedProps.overlayClass}>
        <div class="sortable">
          {activeItem() ? mergedProps.itemComponent(activeItem()!) : null}
        </div>
      </DragOverlay>
    </DragDropProvider>
  )
}
