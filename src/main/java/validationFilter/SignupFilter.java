package validationFilter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;

import utility.DbManager;
import utility.valid;

/**
 * Servlet Filter implementation class SignupFilter
 */
@WebFilter("/Signup")
public class SignupFilter extends HttpFilter implements Filter {
       
    private static final long serialVersionUID = 1L;

	/**
     * @see HttpFilter#HttpFilter()
     */
    public SignupFilter() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		if(valid.isValid(((HttpServletRequest)request).getParameter("gmail"))) {
			if(!DbManager.checkGmail(((HttpServletRequest)request).getParameter("gmail"))) {
			if(valid.isValidname(((HttpServletRequest)request).getParameter("name"))) {
				if(valid.isValidPassword(((HttpServletRequest)request).getParameter("password"))) {
		          if(!DbManager.checkName(((HttpServletRequest)request).getParameter("id"))) {
					chain.doFilter(request, response);
		          }
		          else {
		      		response.getWriter().append("./frontPage.html");
		      	 }
				}
				else {
					response.getWriter().append("./frontPage.html");
				 }
			}
			else {
				response.getWriter().append("./frontPage.html");
			 }
		}
			else {
				response.getWriter().append("./frontPage.html");
			 }
	 }else {
		response.getWriter().append("./frontPage.html");
	 }
	 }

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
