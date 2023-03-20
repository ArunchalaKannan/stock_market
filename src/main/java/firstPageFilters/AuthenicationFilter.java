package firstPageFilters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utility.DbManager;

/**
 * Servlet Filter implementation class AuthenicationFilter
 */
@WebFilter("/myapp/*")
public class AuthenicationFilter extends HttpFilter implements Filter {
       
    private static final long serialVersionUID = 1L;

	/**
     * @see HttpFilter#HttpFilter()
     */
    public AuthenicationFilter() {
        super();
        // TODO Auto-generated constructor stub
    }
	public void destroy() {
		// TODO Auto-generated method stub
	}
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		Cookie[] cookies= ((HttpServletRequest)request).getCookies();
		
	    if(cookies!=null) {
	    	for(Cookie i:cookies) {
	    		if(i.getName().equals("sessionid")) {
	    			if(DbManager.getSession(i.getValue())!=null) {
	    			chain.doFilter(request, response);
	    			}
	    			else {
	    		    	((HttpServletResponse)response).getWriter().append("./frontPage.html");
	    		    }
	    		}
	    	}
	    	}
	    
	}
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
