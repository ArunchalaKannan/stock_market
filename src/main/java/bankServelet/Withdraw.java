package bankServelet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utility.Bank;
import utility.Resource;
import utility.Users;

/**
 * Servlet implementation class Withdraw
 */
@WebServlet("/myapp/Withdraw")
public class Withdraw extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Withdraw() {
        super();
        // TODO Auto-generated constructor stub
    }
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Cookie[] cookies= request.getCookies();
		Users obj =null;
	    if(cookies!=null) {
	    	for(Cookie i:cookies) {
	    		if(i.getName().equals("sessionid")) {
	    			obj=Resource.users.get(i.getValue());
	    			System.out.println(request.getParameter("amount"));
	    			Bank temp = new Bank(obj.amount,obj.userid);
	    	    	temp.withdraw(Integer.parseInt(request.getParameter("amount")));
	    	    	obj.amount=(int)temp.balance;
	    			break;
	    		}
	    	}
	    	
	    	}
	}

}
