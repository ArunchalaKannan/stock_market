package firstPageServelet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utility.Resource;
import utility.Users;

/**
 * Servlet implementation class profile
 */
@WebServlet("/myapp/profile")
public class profile extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public profile() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Cookie[] cookies= request.getCookies();
	    if(cookies!=null) {
	    	for(Cookie i:cookies) {
	    		if(i.getName().equals("sessionid")) {
	                Users obj =Resource.users.get(i.getValue());
	                response.getWriter().append(obj.name+","+obj.userid+","+obj.email+","+obj.amount);
	    			break;
	    		}
	    	}
	    	}
	}

}
