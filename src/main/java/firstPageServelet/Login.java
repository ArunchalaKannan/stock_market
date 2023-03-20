package firstPageServelet;

import java.io.IOException;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import utility.DbManager;
import utility.Resource;
import utility.Users;
/**
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
        // TODO Auto-generated constructor stub
    }
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username=request.getParameter("id");
		UUID uuid = UUID.randomUUID();
	    Cookie cookie = new Cookie("sessionid", uuid.toString());
	    DbManager.createSession(uuid.toString(), username);
	    Users obj = DbManager.getUser(username);
	    obj.updatest();
	    Resource.users.put(uuid.toString(),obj);
	    Resource.stocks.put(uuid.toString(), obj.map);
	    System.out.println(Resource.stocks.get(uuid.toString()));
	    response.addCookie(cookie);
	    response.getWriter().append("./home.html");
		
	}

}
