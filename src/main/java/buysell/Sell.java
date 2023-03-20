package buysell;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utility.Bank;
import utility.Resource;
import utility.UserStock;
import utility.Users;

/**
 * Servlet implementation class Sell
 */
@WebServlet("/myapp/Sell")
public class Sell extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Sell() {
        super();
        // TODO Auto-generated constructor stub
    }
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Cookie[] cookies= request.getCookies();
	    if(cookies!=null) {
	    	for(Cookie i:cookies) {
	    		if(i.getName().equals("sessionid")) {
	                HashMap<String,UserStock> inp = Resource.stocks.get(i.getValue());
	                Users obj =Resource.users.get(i.getValue());
	                obj.map=inp;
	                obj.map.get(Resource.company[Integer.parseInt(request.getParameter("id"))]).count-=Integer.parseInt(request.getParameter("count"));
	                Bank temp = new Bank(obj.amount,obj.userid);
	    	    	temp.deposit(Resource.percent[Integer.parseInt(request.getParameter("id"))]*Integer.parseInt(request.getParameter("count")));
	    	    	obj.amount=(int)temp.balance;
	                obj.update();
	    			break;
	    		}
	    	}
	    	}
	}

}
