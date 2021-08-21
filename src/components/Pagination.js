import { useDispatch, useSelector } from "react-redux";
import { setPageAction } from "../store/action";
import { useState } from "react";
import Toast from "../helpers/swalToast";

function Pagination() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const documents = useSelector((state) => state.documents);
  const [pageInput, setPageInput] = useState("");
  let previousClass = "page-item";
  let nextClass = "page-item";
  let firstNumber;
  let secondNumber;
  let thirdNumber;
  let firstNumberClass;
  let secondNumberClass;
  let thirdNumberClass;
  const handleInput = (event) => {

    setPageInput(event.target.value);
  };
  const changePageHandle = (event, pageNumber) => {
    event.preventDefault();

    if(pageNumber> Math.ceil(documents.length /10) || !pageNumber){
        Toast.fire({
            icon: "warning",
            title: "Page not found",
          });
    }else{

        dispatch(setPageAction(pageNumber));
    }
  };
  if (currentPage == 1) {
    previousClass = "page-item disabled";
    firstNumber = currentPage;
    secondNumber = currentPage + 1;
    thirdNumber = currentPage + 2;
    firstNumberClass = "page-item active";
  } else {
    firstNumber = currentPage - 1;
    secondNumber = currentPage;
    thirdNumber = currentPage + 1;
    secondNumberClass = "page-item active";
  }
  if (Math.ceil(documents.length / 10) == currentPage) {
    nextClass = "page-item disabled";
  }
  if (Math.ceil(documents.length / 10) == currentPage && currentPage > 2) {
    firstNumber = currentPage - 2;
    secondNumber = currentPage - 1;
    thirdNumber = currentPage;
    thirdNumberClass = "page-item active";
    nextClass = "page-item disabled";
    secondNumberClass = "page-item";
  }
  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center">
        <li className={previousClass}>
          <a
            onClick={(e) => {
              changePageHandle(e, 1);
            }}
            className="page-link"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li className={previousClass}>
          <a
            onClick={(e) => {
              changePageHandle(e, currentPage - 1);
            }}
            className="page-link"
            href="#"
            tabindex="-1"
            aria-disabled="true"
          >
            Prev
          </a>
        </li>
        <li className={firstNumberClass}>
          <a
            onClick={(e) => {
              changePageHandle(e, firstNumber);
            }}
            className="page-link"
            href="#"
          >
            {firstNumber}
          </a>
        </li>
        {documents.length > 10 ? (
          <li className={secondNumberClass} aria-current="page">
            <a
              onClick={(e) => {
                changePageHandle(e, secondNumber);
              }}
              className="page-link"
              href="1"
            >
              {secondNumber}
            </a>
          </li>
        ) : null}
        {documents.length > 20 ? (
          <li
            onClick={(e) => {
              changePageHandle(e, thirdNumber);
            }}
            className={thirdNumberClass}
          >
            <a className="page-link" href="#">
              {thirdNumber}
            </a>
          </li>
        ) : null}

        <li className={nextClass}>
          <a
            onClick={(e) => {
              changePageHandle(e, currentPage + 1);
            }}
            className="page-link"
            href="#"
          >
            Next
          </a>
        </li>
        <li className={nextClass}>
          <a
            onClick={(e) => {
              changePageHandle(e, Math.ceil(documents.length / 10));
            }}
            className="page-link"
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
        <form method="get" className="form-horizontal" action=""
          onSubmit={(e) => {
            changePageHandle(e, Number(pageInput));
          }}>
          <div className="form-group input-group col-md-2">
            <input type="hidden" />
            <input
              required
              type="number"
              className="form-control input-sm pagination-form"
              name="pn"
              size="2"
              placeholder="Page #"
              onChange={handleInput}
            ></input>
            <button
              className="btn btn-default btn-sm pagination-button"
              type="submit"

            >
              Go
            </button>
          </div>
        </form>
      </ul>
    </nav>
  );
}

export default Pagination;
