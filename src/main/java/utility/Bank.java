package utility;

public class Bank {
	private String username;
	public double balance;
	
    public Bank(double balance,String username) {
        this.username = username;
    	this.balance = balance;
    }
    public String getUser() {
    	return username;
    }
    public void deposit(double amount) {
    	if(amount<0) {
    		System.out.println("Invalid input");
    	}
    	else {
        balance += amount;
        DbManager.updateAmount(username, (int)balance);
    	}
    }

    public void withdraw(double amount) {
    	if(amount<0) {
    		System.out.println("Invalid input");
    	}else if (balance >= amount) {
            balance -= amount;
            DbManager.updateAmount(username, (int)balance);
        }else {
            System.out.println("Insufficient funds");
        }
    }

     public double checkBalance() {
        return balance;
      }
}
