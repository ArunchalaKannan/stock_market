package utility;

import java.util.HashMap;

public class Resource {
	public static String company[]= {"Apple","Alphabet","Saudi Aramco","Micro Soft","Amazon","American Express","Amgen","Boeing","Caterpillar","Chevron","Cisco Systems","Coca Cola","Dow Inc","Goldman Sachs","Home Depot","Honeywell international","Intel","IBM","Jpmorgan Chaase","McDonald's","3M","Merck","Nike","SalesForce","Travelers","Verizon","Visa","Walgreens Allience","Walmart","Walt Disney"
	};
	public static int[] percent= DbManager.lastStock();	
	public static int[] openn= new int[30];	
	public static int[] low= new int[30];	
	public static int[] high= new int[30];	
	public static int[] volume= new int[30];
	public Users user;
	public static HashMap<String,Users> users=new HashMap<String,Users>();
	public static HashMap<String,HashMap<String,UserStock>> stocks=new HashMap<>();
	public static double getMarketCap() {
        double amount = 0.0;
        for (int price : percent) {
            amount += price;
        }
        return amount;
    }
	public static String analysis(int elem) {
		int []temp=DbManager.lastStock();
		for(int i=0;i<company.length;i++) {
			 int value=(int) (temp[i]+(Math.round((Math.random() < 0.49 ? 1 : -1) * Math.random() * 10)));
			  percent[i]=value;
			  openn[i] = (int) (value + Math.round(Math.random() * 16 - 8));
			  low[i] = (int) (Math.min(value, openn[i]) - Math.round(Math.random() * 5));
			  high[i] = (int) (Math.max(value, openn[i]) + Math.round(Math.random() * 5));
			  volume[i]=(int) ((int)400000+ Math.round(Math.random() * 10));
		}
		DbManager.setStock(percent);
		DbManager.setOhl(openn,high,low,volume);
		return percent[elem]+","+openn[elem]+","+high[elem]+","+low[elem];
	}
	//Recommandation servelet
	public static String Recommandation(String ticker) {
	int[] data = DbManager.getSpecStock(Integer.parseInt(ticker)-1);
	Integer currentPrice = data[data.length-1];
	double amount = 0.0;
    for (int price : data) {
        amount += price;
    }
	double averagePrice = (amount/data.length);
    if (currentPrice<averagePrice) {
    	String output= "<center><h1>Recommendation</h1><h3>current market capital : "+getMarketCap()+"</h3>";
    	output+="<h3>Expected Average rate of stock   :"+(int)averagePrice+" </h3>";
    	output+="<h3>Stocks current rate : "+percent[Integer.parseInt(ticker)-1]+"</h3>";
    	output+="<h3>It is recommended to buy "+company[Integer.parseInt(ticker)-1]+"  at this time.</h3></center>";
        return  output;
    } else {
    	String output= "<center><h1>Recommendation</h1><h3>current market capital : "+getMarketCap()+"</h3>";
    	output+="<h3>Expected Average rate of stock   :"+(int)averagePrice+" </h3>";
    	output+="<h3>Stocks current rate : "+percent[Integer.parseInt(ticker)-1]+"</h3>";
    	output+="<h3>It is recommended to sell "+company[Integer.parseInt(ticker)-1]+"  at this time.</h3></center>";
        return  output;
    }
    }
	//volality servelet
	 public static String displayStockVolatility(int ind) {
  	   
	     int[] stockData = DbManager.getSpecStock(ind-1);
     	double averagePriceChange = 0;
     	double temp=0.0;
         for (int i=0;i<stockData.length-2;i++) {
             averagePriceChange = averagePriceChange+(stockData[i]-stockData[i+1]);
             temp+=stockData[i];
         }
         double averagePrice = (temp+percent[percent.length-1])/stockData.length;
         averagePriceChange = averagePriceChange/stockData.length;
         String output= "<center><h1>volatility</h1><h2>Stock volatility for "+company[ind-1]+"</h2>";
     	 output+="<h2>Average closing price:" + String.format("%.2f",  averagePrice) +"</h2>";
     	 output+="<h2>Average price change: " + String.format("%.2f",  averagePriceChange)+"</h2></center>";
         return  output;
         }
	 //performance
	 public static String showStockPerformance(int ind) {
	    	String stockName=company[ind-1];
	    	int[] stockValues=DbManager.getSpecStock(ind-1);
	        double[] dailyReturn = new double[stockValues.length - 1];
	        for (int i = 0; i < dailyReturn.length; i++) {
	            dailyReturn[i] = (stockValues[i + 1] - stockValues[i]);
	        }
	        double averageReturn = 0;
	        for (int i = 0; i < dailyReturn.length; i++) {
	            averageReturn += dailyReturn[i];
	        }
	        averageReturn = averageReturn / dailyReturn.length;
	        double standardDeviation = 0;
	        for (int i = 0; i < dailyReturn.length; i++) {
	            standardDeviation += Math.pow(dailyReturn[i] - averageReturn, 2);
	        }
	        standardDeviation = Math.sqrt(standardDeviation / dailyReturn.length);
	        String output= "<center><h1>Performance</h1><h2>Stock Name: " + stockName+"</h2>";
	     	 output+="<h2>Stock Average Return: " +String.format("%.2f",  averageReturn)+"</h2>";
	     	 output+="<h2>Stock Standard Deviation: " + String.format("%.2f",  standardDeviation)+"</h2></center>";
	        return output;
	    }
	 
	 public static String showStockMovingAverage(int ind) {
	    	int[] stockValues=DbManager.getSpecStock(ind-1);
	        int[] movingAverage = new int[stockValues.length - 2];
	        for (int i = 0; i < movingAverage.length; i++) {
	            movingAverage[i] = (stockValues[i] + stockValues[i + 1] + stockValues[i + 2]) / 3;
	        }
	        int j=0;
	         String output="";
	        
	        for (int i = movingAverage.length-7; i < movingAverage.length; i++) {
	        	output+= "<div class='card'><h2>Day : "+(j+1)+"</h2><div class='product-info'><br><p class='price'>Price:"+movingAverage[i]+ "</p></div></div>";
	            j++;
	        }
	        return output; 
	    }
	 
	 public static String[] comparision(int ind) {
		 String [] temp = new String[4];
	    	int[] stockValues=DbManager.getSpecStock(ind-1);
	        double[] dailyReturn = new double[stockValues.length - 1];
	        for (int i = 0; i < dailyReturn.length; i++) {
	            dailyReturn[i] = (stockValues[i + 1] - stockValues[i]);
	        }
	        double averageReturn = 0;
	        for (int i = 0; i < dailyReturn.length; i++) {
	            averageReturn += dailyReturn[i];
	        }
	        averageReturn = averageReturn / dailyReturn.length;
	        double standardDeviation = 0;
	        for (int i = 0; i < dailyReturn.length; i++) {
	            standardDeviation += Math.pow(dailyReturn[i] - averageReturn, 2);
	        }
	        standardDeviation = Math.sqrt(standardDeviation / dailyReturn.length);
	        //
	        int[] stockData = DbManager.getSpecStock(ind-1);
	     	double averagePriceChange = 0;
	     	double tmp=0.0;
	         for (int i=0;i<stockData.length-2;i++) {
	             averagePriceChange = averagePriceChange+(stockData[i]-stockData[i+1]);
	             tmp+=stockData[i];
	         }
	         averagePriceChange = averagePriceChange/stockData.length;
	         //
	        temp[0]=String.format("%.2f",((percent[ind-1]*100)/getMarketCap()));
	        temp[1]=String.format("%.2f",  (averageReturn<0?averageReturn*-1:averageReturn));
	        temp[2]=String.format("%.2f",  standardDeviation);
	        temp[3]=String.format("%.2f",  standardDeviation-averagePriceChange-2);
		    return temp;
	 }
}