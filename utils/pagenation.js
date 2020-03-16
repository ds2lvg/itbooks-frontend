module.exports = {
  getPagination: function({currentPage, totalCount, limit}) {
    // console.log(currentPage, totalCount, limit);
    const maxNum=10;
    const pn = [];
    const maxPage = Math.floor(totalCount/limit);
    for(let i=currentPage-maxNum; i<currentPage+maxNum && i<=maxPage; i++) {
      if(i> -1) pn.push(i);
    }
    return pn;
  },
  getPageInfoForButton: function({currentPage, totalCount, limit}) {
    const countList = limit;
    let totalPage = Math.floor(totalCount / countList);
    let page = currentPage+1;
    const countPage = 10;

    if (totalCount % countList > 0) totalPage++;
    if (totalPage < page) page = totalPage;
    
    const startPage = Math.floor((page - 1) / countPage) * countPage + 1;
    let endPage = startPage + countPage - 1;

    if (totalPage < endPage) endPage = totalPage;

    // console.log({ startPage, page, totalPage, endPage })
    
    return { startPage, page, totalPage, endPage };
  }
};