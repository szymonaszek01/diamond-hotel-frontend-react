export const toRoomSelectedCostMapper = (res) => {
  return {
    name: res.room_selected_cost.name,
    cost: res.room_selected_cost.cost
  }
}