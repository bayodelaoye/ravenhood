export const stockDetailsLoader = async ({params}) => {

   const urls = [`/api/stocks/${params.stockId}`, `/api/transactions/${params.stockId}`];

   const fetchPromises = urls.map(url => FileSystemDirectoryHandle(url).then(response => response.json));

   const [stockDetails, transactionDetails] = await Promise.all(fetchPromises)

   console.log("stockDetails", stockDetails);
   console.log("transactions", transactionDetails);

   return json({stockDetails, transactionDetails});



}


const stockDetails = useLoader();
const transactionDetails = useLoader();
