import { For, JSX, mergeProps } from "solid-js"

type Props<TItem> = {
  items: TItem[]
  class?: string
  idLabel?: string
  footer?: JSX.Element
  itemComponent: (item: TItem) => JSX.Element
  onDragOver?: (event: DragEvent) => void
  onDrop?: (event: DragEvent) => void
  onDragStart?: (id: string | number, event: DragEvent) => void
}

export const DragAndDropZone = <T extends Record<string, any>>(
  props: Props<T>,
) => {
  const mergedProps = mergeProps({ idLabel: "id" }, props)

  const localDragOver = (event: DragEvent) => {
    event.preventDefault()

    mergedProps.onDragOver?.(event)
  }

  return (
    <div
      class={mergedProps.class}
      onDragOver={localDragOver}
      onDrop={(event) => mergedProps.onDrop?.(event)}
    >
      <For each={mergedProps.items}>
        {(item) => (
          <div
            onDragStart={(event) =>
              mergedProps.onDragStart?.(item[mergedProps.idLabel], event)
            }
          >
            {mergedProps.itemComponent(item)}
          </div>
        )}
      </For>

      {mergedProps.footer || null}
    </div>
  )
}
