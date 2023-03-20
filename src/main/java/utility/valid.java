package utility;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class valid {
	private valid(){}
	  //gmail verifier
	 public static boolean isValid(String email){
	        String emailRegex = "^[\\w.+\\-]+@gmail\\.com$";         
	        Pattern pat = Pattern.compile(emailRegex, Pattern.CASE_INSENSITIVE);
	        if (email == null) {
	        	return false;
	        }
	        return pat.matcher(email).matches();
	    }
	    
	     //name verifier
	     public static boolean isValidname(String name){
	        String regex = "^[A-Za-z]\\w{2,29}$";
	        Pattern p = Pattern.compile(regex);
	        if (name == null) 
	           return false;
	        Matcher m = p.matcher(name);
	        return m.matches();
	    }
	    //password verifier
	    public static boolean isValidPassword(String password){
	        String regex = "(?=.*[0-9])"+"(?=.*[a-z])(?=.*[A-Z])"+"(?=.*[!~@#$%^&+=])"+"(?=\\S+$).{8,20}$";
	        Pattern p = Pattern.compile(regex);
	        if (password == null)
	            return false;
	        Matcher m = p.matcher(password);
	        return m.matches();
	    }
}
