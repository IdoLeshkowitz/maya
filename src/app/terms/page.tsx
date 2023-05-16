export default function Terms() {
    return (
        <form action="/none" method="post">
            <input type="checkbox" required id="terms" name="terms"/>
            <label htmlFor="terms">I agree to the terms and conditions</label>
            <button type="submit">Submit</button>
        </form>
    )
}