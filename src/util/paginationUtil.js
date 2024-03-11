// 담당자 : 사공은진
import _ from "lodash";

export const returnPaginationRagne = (totalPage, page, limit, siblings) => {
  let totalPageNoInArray = 7 + siblings;
  if (totalPageNoInArray >= totalPage) {
    return _.range(1, totalPage + 1);
  }
  let leftSiblingsIndex = Math.max(page - siblings, 1);
  let rightSiblingsIndex = Math.min(page + siblings, totalPage);

  if (leftSiblingsIndex > 2) {
    let leftItemsCount = 3 + 2 * siblings;
    return _.range(1, leftItemsCount + 1);
  } else if (rightSiblingsIndex < totalPage - 2) {
    let rightItemsCount = 3 + 2 * siblings;
    return _.range(totalPage - rightItemsCount + 1, totalPage);
  } else {
    return _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
  }
};
