package firstPageServelet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utility.DbManager;
import utility.Resource;

/**
 * Servlet implementation class Logout
 */
@WebServlet("/Logout")
public class Logout extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Logout() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("hiiiiii");
		Cookie[] cookies= request.getCookies();
	    if(cookies!=null) {
	    	for(Cookie i:cookies) {
	    		if(i.getName().equals("sessionid")) {
	    			Resource.stocks.remove(i.getValue());
	    			Resource.users.remove(i.getValue());
	    			System.out.println(Resource.users);
	    			DbManager.deleteSession(i.getValue());
	    			i.setValue("");
	    			response.getWriter().append("./frontPage.html");
	    			break;
	    		}
	    	}
	    	}
	}

}
