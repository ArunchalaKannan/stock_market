package analysisServelet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utility.Resource;
import utility.UserStock;

/**
 * Servlet implementation class holdings
 */
@WebServlet("/myapp/holdings")
public class holdings extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public holdings() {
        super();
        // TODO Auto-generated constructor stub
    }
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<Integer> ids = new ArrayList<Integer>();
		List<Integer> count = new ArrayList<Integer>();
		Cookie[] cookies= request.getCookies();
	    if(cookies!=null) {
	    	for(Cookie i:cookies) {
	    		if(i.getName().equals("sessionid")) {
	                HashMap<String,UserStock> inp = Resource.stocks.get(i.getValue());
	                for(int k=0;k<30;k++) {
	                	if(inp.get(Resource.company[k]).count!=0) {
	                		ids.add(k);
	                		count.add(inp.get(Resource.company[k]).count);
	                	}
	                }
	                response.getWriter().append(ids+"||"+count);
	    			break;
	    		}
	    	}
	    	}
	}

}
