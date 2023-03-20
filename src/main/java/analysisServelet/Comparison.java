package analysisServelet;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utility.Resource;

/**
 * Servlet implementation class Comparison
 */
@WebServlet("/myapp/Comparison")
public class Comparison extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Comparison() {
        super();
        // TODO Auto-generated constructor stub
    }
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int first= Integer.parseInt(request.getParameter("i1"));
		int second= Integer.parseInt(request.getParameter("i2"));
		response.getWriter().append(Arrays.toString(Resource.comparision(first))+"||"+Arrays.toString(Resource.comparision(second)));
	}

}
