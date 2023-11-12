export default function getIndexesByPage(
  currentPage: number,
  itemsPerPage: number
) {
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  return [firstItemIndex, lastItemIndex];
}
