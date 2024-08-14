import { useLoaderData } from "react-router-dom";
import "./TransactionsPage.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function TransactionsPage() {
  const dispatch = useDispatch();
  const stockDetails = useLoaderData();

  return <></>;
}

export default TransactionsPage;
