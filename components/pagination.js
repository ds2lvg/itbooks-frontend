import React, { useEffect, memo } from 'react';

const Pagination = ({pageInfo, pages, pageNum, getPage, changePages}) => {
  const handlePages  = (startNum) => {
    console.log('startNum', startNum)
    if(startNum < 0) startNum = 0;
    if(startNum >= pageInfo.totalPage) startNum = pageInfo.totalPage-1;
    const arrPage = [];
    for(var i=startNum; i<=(startNum+9); i++) {
      if(i < pageInfo.totalPage) arrPage.push(i);
    }
    changePages(arrPage); // 페이징 배열 변경
    getPage(startNum); // 현재 페이지 번호 변경
  }

  useEffect(() => {
    console.log('페이징',{pageInfo, pages, pageNum, getPage})
  }, [pages, pageInfo, pageNum, getPage]);

  return (
    <div className="pagination">
    {
      pageNum+1 > 1 
      ? <button onClick={() => handlePages(0)}>처음</button>
      : ''
    }
    {
      pageNum+1 > 1 
      ? <button onClick={() => handlePages(pageInfo.startPage-11)}>이전</button>
      : ''
    }
    {
      pages.map(page => (
        <button key={page} onClick={() => getPage(page)}>
          { page === pageNum ? <strong>{page+1}</strong> : page+1 }
        </button>
      ))
    }
    {
      pages[pages.length-1] + 1 >= pageInfo.totalPage
      ? ''
      : <button onClick={() => handlePages(pageInfo.endPage)}>다음</button>
    }
    {
      pages[pages.length-1] + 1 >= pageInfo.totalPage
      ? ''
      : <button onClick={() => handlePages(pageInfo.totalPage-(pageInfo.totalPage%10))}>마지막</button>
    }
    </div>
  );
};

export default Pagination;