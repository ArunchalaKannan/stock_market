package firstPageServelet;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utility.*;

/*
 * Servlet implementation class Signup
 */
@WebServlet("/Signup")
public class Signup extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /*
     * @see HttpServlet#HttpServlet()
     */
    public Signup() {
        super();
        // TODO Auto-generated constructor stub
    }
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username=request.getParameter("id");
		String password=request.getParameter("password");
		String name=request.getParameter("name");
		String gmail=request.getParameter("gmail");
		int amount=Integer.parseInt(request.getParameter("amount"));
		DbManager.addUser(username, password, name, gmail, amount);
		Users obj = DbManager.getUser(username);
		Integer[] array = new Integer[30];
		for(int i=0;i<30;i++) {
			array[i]=obj.map.get(Resource.company[i]).toInt();
		}
		DbManager.createStock(username, array);
		UUID uuid = UUID.randomUUID();
	    Cookie cookie = new Cookie("sessionid", uuid.toString());
	    Resource.users.put(uuid.toString(),obj);
	    Resource.stocks.put(uuid.toString(), obj.map);
	    DbManager.createSession(uuid.toString(), username);
	    response.addCookie(cookie);
	    response.getWriter().append("./home.html");
	}

}
