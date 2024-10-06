import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.UserChoiceBillingListener;
import com.android.billingclient.api.UserChoiceDetails;

public class MainActivity extends ReactActivity {
    private BillingClient billingClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        billingClient = BillingClient.newBuilder(this)
            .setListener(purchaseListener)
            .enableUserChoiceBilling() // Aktifkan opsi penagihan pilihan pengguna
            .build();

        billingClient.setUserChoiceBillingListener(new UserChoiceBillingListener() {
            @Override
            public void onUserSelectedAlternativeBilling(UserChoiceDetails userChoiceDetails) {
                // Dapatkan token transaksi eksternal
                String externalTransactionToken = userChoiceDetails.getTransactionToken();

                // Kirim token ini ke backend Anda untuk disimpan
                sendTokenToBackend(externalTransactionToken);

                // Sekarang, Anda dapat memulai alur pembelian melalui Midtrans atau sistem alternatif lainnya
                startAlternativeBillingFlow();
            }
        });
    }

    private void sendTokenToBackend(String token) {
        // Kirim token ini ke backend Anda
        // Contoh sederhana menggunakan OkHttp atau library jaringan lainnya
    }

    private void startAlternativeBillingFlow() {
        // Luncurkan alur pembelian menggunakan sistem penagihan alternatif seperti Midtrans
    }
}
