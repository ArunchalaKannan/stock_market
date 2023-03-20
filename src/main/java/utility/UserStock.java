package utility;
public class UserStock {
        public String name;
        public int count;
        public String category;
        UserStock(String name,int count,String category){
        	this.name=name;
        	this.count=count;
        	this.category=category;
        }
        public int toInt() {
        	return count;
        }
        public String toCategory() {
        	return category;
        }
        public String toString() {
        	return "count : "+count;
        }
}
