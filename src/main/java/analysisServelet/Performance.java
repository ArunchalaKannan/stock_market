package analysisServelet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utility.Resource;

/**
 * Servlet implementation class Performance
 */
@WebServlet("/myapp/Performance")
public class Performance extends HttpServlet {
	private static final long serialVersionUID = 1L;
     /**
     * @see HttpServlet#HttpServlet()
     */
    public Performance() {
        super();
        // TODO Auto-generated constructor stub
    }
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String price = request.getParameter("id");
		String output =Resource.showStockPerformance(Integer.parseInt(price));
		response.getWriter().append(output);
	}

}
