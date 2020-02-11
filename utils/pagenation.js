module.exports = {
  getPagination : function({currentPage, totalCount, limit}) {
    // console.log(currentPage, totalCount, limit);
    const pn = [];
    const maxPage = Math.floor(totalCount/limit);
    for(let i=currentPage-3; i<currentPage+3 && i<=maxPage; i++) {
      if(i> -1) pn.push(i);
    }
    return pn;
  }
};